import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.XfgUWMby.js";const c=JSON.parse('{"title":"Opening a Zarr directory from a store","description":"","frontmatter":{},"headers":[],"relativePath":"UserGuide/openZarr.md","filePath":"UserGuide/openZarr.md","lastUpdated":null}'),t={name:"UserGuide/openZarr.md"},n=e(`<h1 id="Opening-a-Zarr-directory-from-a-store" tabindex="-1">Opening a Zarr directory from a store <a class="header-anchor" href="#Opening-a-Zarr-directory-from-a-store" aria-label="Permalink to &quot;Opening a Zarr directory from a store {#Opening-a-Zarr-directory-from-a-store}&quot;">​</a></h1><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Zarr, YAXArrays</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">store </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gs://cmip6/CMIP6/ScenarioMIP/DKRZ/MPI-ESM1-2-HR/ssp585/r1i1p1f1/3hr/tas/gn/v20190710/&quot;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;gs://cmip6/CMIP6/ScenarioMIP/DKRZ/MPI-ESM1-2-HR/ssp585/r1i1p1f1/3hr/tas/gn/v20190710/&quot;</span></span></code></pre></div><p>Open and select the <code>tas</code> variable,</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> open_dataset</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">zopen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(store, consolidated</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">YAXArray Dataset</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">Shared Axes:</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">Variables:</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">height,</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">tas</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">lon</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{Float64} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">0.0:0.9375:359.0625</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">,</span></span>
<span class="line"><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  → </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">lat</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{Float64} </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">[-89.28422753251364, -88.35700351866494, …, 88.35700351866494, 89.28422753251364]</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Irregular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">,</span></span>
<span class="line"><span style="--shiki-light:#5fd7ff;--shiki-dark:#5fd7ff;">  ↗ </span><span style="--shiki-light:#5fd7ff;--shiki-dark:#5fd7ff;">Ti </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{DateTime} </span><span style="--shiki-light:#5fd7ff;--shiki-dark:#5fd7ff;">[2015-01-01T03:00:00, …, 2101-01-01T00:00:00]</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Irregular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">Properties: Dict{String, Any}(&quot;initialization_index&quot; =&gt; 1, &quot;realm&quot; =&gt; &quot;atmos&quot;, &quot;variable_id&quot; =&gt; &quot;tas&quot;, &quot;external_variables&quot; =&gt; &quot;areacella&quot;, &quot;branch_time_in_child&quot; =&gt; 60265.0, &quot;data_specs_version&quot; =&gt; &quot;01.00.30&quot;, &quot;history&quot; =&gt; &quot;2019-07-21T06:26:13Z ; CMOR rewrote data to be consistent with CMIP6, CF-1.7 CMIP-6.2 and CF standards.&quot;, &quot;forcing_index&quot; =&gt; 1, &quot;parent_variant_label&quot; =&gt; &quot;r1i1p1f1&quot;, &quot;table_id&quot; =&gt; &quot;3hr&quot;…)</span></span></code></pre></div><p>get variable</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;tas&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">╭────────────────────────────────────╮</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">│ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">384</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">×</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">192</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">×</span><span style="--shiki-light:#5fd7ff;--shiki-dark:#5fd7ff;">251288</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> YAXArray{Float32,3}</span><span style="--shiki-light:#959da5;--shiki-dark:#959da5;"> │</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────────────────┴─────────────────────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">lon</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{Float64} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">0.0:0.9375:359.0625</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">,</span></span>
<span class="line"><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  → </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">lat</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{Float64} </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">[-89.28422753251364, -88.35700351866494, …, 88.35700351866494, 89.28422753251364]</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Irregular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">,</span></span>
<span class="line"><span style="--shiki-light:#5fd7ff;--shiki-dark:#5fd7ff;">  ↗ </span><span style="--shiki-light:#5fd7ff;--shiki-dark:#5fd7ff;">Ti </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{DateTime} </span><span style="--shiki-light:#5fd7ff;--shiki-dark:#5fd7ff;">[2015-01-01T03:00:00, …, 2101-01-01T00:00:00]</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Irregular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  Dict{String, Any} with 10 entries:</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;units&quot;         =&gt; &quot;K&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;history&quot;       =&gt; &quot;2019-07-21T06:26:13Z altered by CMOR: Treated scalar dime…</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;name&quot;          =&gt; &quot;tas&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;cell_methods&quot;  =&gt; &quot;area: mean time: point&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;cell_measures&quot; =&gt; &quot;area: areacella&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;long_name&quot;     =&gt; &quot;Near-Surface Air Temperature&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;coordinates&quot;   =&gt; &quot;height&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;standard_name&quot; =&gt; &quot;air_temperature&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;_FillValue&quot;    =&gt; 1.0f20</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  &quot;comment&quot;       =&gt; &quot;near-surface (usually, 2 meter) air temperature&quot;</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├───────────────────────────────────────────────────────────────── file size ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  file size: 69.02 GB</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">└────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p>After this operate on it as usual.</p>`,10),l=[n];function p(h,k,r,d,o,g){return a(),i("div",null,l)}const y=s(t,[["render",p]]);export{c as __pageData,y as default};
