export InDims, OutDims,AsArray,AsDataFrame,AsAxisArray
const AxisDescriptorAll = Union{AxisDescriptor,String,Type{T},CubeAxis,Function} where T<:CubeAxis
using ..Cubes.Axes: get_descriptor, ByFunction
using ...ESDL: workdir, ESDLDefaults
using DataFrames: DataFrame

abstract type ArTypeRepr end
struct AsArray <: ArTypeRepr end
#struct AsAxisArray <: ArTypeRepr end
struct AsDataFrame <: ArTypeRepr
  dimcol::Bool
end
AsDataFrame()=AsDataFrame(false)
wrapWorkArray(::AsArray,a,axes) = a
# function wrapWorkArray(::AsAxisArray,a,cablabaxes)
#   newaxes = map(cablabaxes) do ax
#     AxisArrays.Axis{Symbol(axname(ax))}(ax.values)
#   end
#   AxisArrays.AxisArray(a,newaxes...)
# end
import DataFrames
function wrapWorkArray(t::AsDataFrame,a,cablabaxes)
  colnames = map(Symbol,cablabaxes[2].values)
  df = DataFrames.DataFrame(a,colnames)
  if t.dimcol
    df[Symbol(axname(cablabaxes[1]))]=collect(cablabaxes[1].values)
  end
  df
end

abstract type ProcFilter end
struct AllMissing <: ProcFilter end
struct NValid     <: ProcFilter
  n::Int
end
struct AnyMissing <: ProcFilter end
struct AnyOcean   <: ProcFilter end
struct NoFilter   <: ProcFilter end
struct StdZero    <: ProcFilter end
struct UserFilter{F} <: ProcFilter
  f::F
end

checkskip(::NoFilter,x)         = false
checkskip(::AllMissing,x::AbstractArray)   = all(ismissing,x)
checkskip(::AllMissing,df::DataFrame)  = any(map(i->all(ismissing,getindex(df,i)),names(df)))
checkskip(::AnyMissing,x::AbstractArray)   = any(ismissing,x)
checkskip(::AnyMissing,df::DataFrame)  = any(map(i->any(ismissing,getindex(df,i)),names(df)))
checkskip(nv::NValid,x::AbstractArray)     = count(!ismissing,x) <= nv.n
checkskip(uf::UserFilter,x) = uf.f(x)
checkskip(::StdZero,x)      = all(i->i==x[1],x)
docheck(pf::ProcFilter,x)::Bool = checkskip(pf,x)
docheck(pf::Tuple,x)        = reduce(|,map(i->docheck(i,x),pf))

getprocfilter(f::Function) = (UserFilter(f),)
getprocfilter(pf::ProcFilter) = (pf,)
getprocfilter(pf::NTuple{N,<:ProcFilter}) where N = pf

"""
    InDims(axisdesc;...)

Creates a description of an Input Data Cube for cube operations. Takes a single
  or a Vector/Tuple of axes as first argument. Axes can be specified by their
  name (String), through an Axis type, or by passing a concrete axis.

### Keyword arguments

* `artype` how shall the array be represented in the inner function. Defaults to `AsArray`, alternatives are `AsDataFrame` or `AsAxisArray`
* `filter` define some filter to skip the computation, e.g. when all values are missing. Defaults to
    `AllMissing()`, possible values are `AnyMissing()`, `AnyOcean()`, `StdZero()`, `NValid(n)`
    (for at least n non-missing elements). It is also possible to provide a custom one-argument function
    that takes the array and returns `true` if the compuation shall be skipped and `false` otherwise.
"""
mutable struct InDims
  axisdesc::Tuple
  artype::ArTypeRepr
  procfilter::Tuple
end
function InDims(axisdesc::AxisDescriptorAll...; artype::ArTypeRepr=AsArray(), filter = AllMissing())
  descs = map(get_descriptor,axisdesc)
  any(i->isa(i,ByFunction),descs) && error("Input cubes can not be specified through a function")
  isa(artype,AsDataFrame) && length(descs)!=2 && error("DataFrame representation only possible if for 2D inner arrays")
  InDims(descs,artype,getprocfilter(filter))
end


struct OutDims
  axisdesc
  backend::Symbol
  backendargs
  update::Bool
  artype::ArTypeRepr
  chunksize::Any
  outtype::Union{Int,DataType}
end
"""
    OutDims(axisdesc;...)

Creates a description of an Output Data Cube for cube operations. Takes a single
  or a Vector/Tuple of axes as first argument. Axes can be specified by their
  name (String), through an Axis type, or by passing a concrete axis.

- `axisdesc`: List of input axis names
- `backend` : specifies the dataset backend to write data to, must be either :auto or a key in `YAXArrayBase.backendlist`
- `update` : specifies wether the function operates inplace or if an output is returned
- `artype` : specifies the Array type inside the inner function that is mapped over
- `chunksize`: Chunk size for the inner dimensions, a tuple of the same length as `axisdesc`, or `:input` to copy chunksizes from input cube axes or `:max` to not chunk the inner dimensions
- `outtype`: force the output type to a specific type, defaults to `Any` which means that the element type of the first input cube is used
"""
function OutDims(axisdesc...;
           backend=:auto,
           update=false,
           artype::ArTypeRepr=AsArray(),
           chunksize=ESDLDefaults.chunksize[],
           outtype=1,
           backendargs...)
  descs = get_descriptor.(axisdesc)
  isa(artype,AsDataFrame) && length(descs)!=2 && error("DataFrame representation only possible if for 2D inner arrays")
  if !in(chunksize,(:input, :max)) && length(chunksize)!=length(axisdesc)
    error("Length of chunk sizes must equal number of inner Axes")
  end
  OutDims(descs,backend,backendargs,update,artype,chunksize,outtype)
end

registerDATFunction(a...;kwargs...)=@warn("Registration does not exist anymore, ignoring....")
