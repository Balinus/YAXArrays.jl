import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.XfgUWMby.js";const y=JSON.parse('{"title":"Create cube / YAXArray from function","description":"","frontmatter":{},"headers":[],"relativePath":"UserGuide/create_cube_from_function.md","filePath":"UserGuide/create_cube_from_function.md","lastUpdated":null}'),e={name:"UserGuide/create_cube_from_function.md"},t=n(`<h1 id="Create-cube-/-YAXArray-from-function" tabindex="-1">Create cube / YAXArray from function <a class="header-anchor" href="#Create-cube-/-YAXArray-from-function" aria-label="Permalink to &quot;Create cube / YAXArray from function {#Create-cube-/-YAXArray-from-function}&quot;">​</a></h1><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> YAXArrays, Zarr</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Dates</span></span></code></pre></div><h2 id="Define-function-in-space-and-time" tabindex="-1">Define function in space and time <a class="header-anchor" href="#Define-function-in-space-and-time" aria-label="Permalink to &quot;Define function in space and time {#Define-function-in-space-and-time}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(lo, la, t) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (lo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> la </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Dates</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dayofyear</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>f (generic function with 1 method)</span></span></code></pre></div><p>Wrap function for mapCube output</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(xout,lo,la,t)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    xout </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.(lo,la,t)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>g (generic function with 1 method)</span></span></code></pre></div><p>Note the applied <code>.</code> after <code>f</code>, this is because we will slice/broadcasted across time.</p><h2 id="Create-Cube&#39;s-Axes" tabindex="-1">Create Cube&#39;s Axes <a class="header-anchor" href="#Create-Cube&#39;s-Axes" aria-label="Permalink to &quot;Create Cube&#39;s Axes {#Create-Cube&#39;s-Axes}&quot;">​</a></h2><p>We wrap the dimensions of every axis into a YAXArray to use them in the mapCube function.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lon </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> YAXArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dim{:lon}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">╭──────────────────────────────╮</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">│ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">15-element </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">YAXArray{Int64,1}</span><span style="--shiki-light:#959da5;--shiki-dark:#959da5;"> │</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├──────────────────────────────┴──────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">lon</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{Int64} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">1:15</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├───────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  Dict{String, Any}()</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├──────────────────────────────────────────── file size ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  file size: 120.0 bytes</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">└───────────────────────────────────────────────────────┘</span></span></code></pre></div><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lat </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> YAXArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dim{:lat}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">╭──────────────────────────────╮</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">│ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">10-element </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">YAXArray{Int64,1}</span><span style="--shiki-light:#959da5;--shiki-dark:#959da5;"> │</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├──────────────────────────────┴──────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">lat</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{Int64} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">1:10</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├───────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  Dict{String, Any}()</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├──────────────────────────────────────────── file size ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  file size: 80.0 bytes</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">└───────────────────────────────────────────────────────┘</span></span></code></pre></div><p>And a time axis</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tspan </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2022-01-01&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Day</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2022-01-30&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">Date(&quot;2022-01-01&quot;):Dates.Day(1):Date(&quot;2022-01-30&quot;)</span></span></code></pre></div><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> time </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> YAXArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dim{:time}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">( tspan))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">╭─────────────────────────────╮</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">│ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">30-element </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">YAXArray{Date,1}</span><span style="--shiki-light:#959da5;--shiki-dark:#959da5;"> │</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├─────────────────────────────┴────────────────────────────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">time</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Sampled{Date} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">Date(&quot;2022-01-01&quot;):Dates.Day(1):Date(&quot;2022-01-30&quot;)</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Points</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  Dict{String, Any}()</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├───────────────────────────────────────────────────────────────── file size ┤</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  file size: 240.0 bytes</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">└────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="Generate-Cube" tabindex="-1">Generate Cube <a class="header-anchor" href="#Generate-Cube" aria-label="Permalink to &quot;Generate Cube {#Generate-Cube}&quot;">​</a></h2><p>The following generates a new <code>cube</code> using <code>mapCube</code> and saving the output directly to disk.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gen_cube </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mapCube</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(g, (lon, lat, time);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    indims </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">InDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">InDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">InDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;time&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    outdims </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> OutDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;time&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, overwrite</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;my_gen_cube.zarr&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, backend</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:zarr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, outtype</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Float32),</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ## max_cache=1e9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;Running nonthreaded&quot; = &quot;Running nonthreaded&quot;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">time axis is first</p><p>Note that currently the <code>time</code> axis in the output cube goes first.</p></div><p>Check that it is working</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gen_cube</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,:,:]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">15×10 reshape(::Array{Union{Missing, Float32}, 3}, 15, 10) with eltype Union{Missing, Float32}:</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  3.0   4.0   5.0   6.0   7.0   8.0   9.0  10.0  11.0  12.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  4.0   5.0   6.0   7.0   8.0   9.0  10.0  11.0  12.0  13.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  5.0   6.0   7.0   8.0   9.0  10.0  11.0  12.0  13.0  14.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  6.0   7.0   8.0   9.0  10.0  11.0  12.0  13.0  14.0  15.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  7.0   8.0   9.0  10.0  11.0  12.0  13.0  14.0  15.0  16.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  8.0   9.0  10.0  11.0  12.0  13.0  14.0  15.0  16.0  17.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  9.0  10.0  11.0  12.0  13.0  14.0  15.0  16.0  17.0  18.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 10.0  11.0  12.0  13.0  14.0  15.0  16.0  17.0  18.0  19.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 11.0  12.0  13.0  14.0  15.0  16.0  17.0  18.0  19.0  20.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 12.0  13.0  14.0  15.0  16.0  17.0  18.0  19.0  20.0  21.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 13.0  14.0  15.0  16.0  17.0  18.0  19.0  20.0  21.0  22.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 14.0  15.0  16.0  17.0  18.0  19.0  20.0  21.0  22.0  23.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 15.0  16.0  17.0  18.0  19.0  20.0  21.0  22.0  23.0  24.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 16.0  17.0  18.0  19.0  20.0  21.0  22.0  23.0  24.0  25.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 17.0  18.0  19.0  20.0  21.0  22.0  23.0  24.0  25.0  26.0</span></span></code></pre></div><h2 id="Change-output-order" tabindex="-1">Change output order <a class="header-anchor" href="#Change-output-order" aria-label="Permalink to &quot;Change output order {#Change-output-order}&quot;">​</a></h2><p>The following generates a new <code>cube</code> using <code>mapCube</code> and saving the output directly to disk.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gen_cube </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mapCube</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(g, (lon, lat, time);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    indims </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">InDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;lon&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">InDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">InDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    outdims </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> OutDims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;lon&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, overwrite</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;my_gen_cube.zarr&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, backend</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:zarr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, outtype</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Float32),</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ## max_cache=1e9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;Running nonthreaded&quot; = &quot;Running nonthreaded&quot;</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">slicing dim</p><p>Note that now the broadcasted dimension is <code>lon</code>.</p></div><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gen_cube</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data[:, :, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">15×10 reshape(::Array{Union{Missing, Float32}, 3}, 15, 10) with eltype Union{Missing, Float32}:</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  3.0   4.0   5.0   6.0   7.0   8.0   9.0  10.0  11.0  12.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  4.0   5.0   6.0   7.0   8.0   9.0  10.0  11.0  12.0  13.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  5.0   6.0   7.0   8.0   9.0  10.0  11.0  12.0  13.0  14.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  6.0   7.0   8.0   9.0  10.0  11.0  12.0  13.0  14.0  15.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  7.0   8.0   9.0  10.0  11.0  12.0  13.0  14.0  15.0  16.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  8.0   9.0  10.0  11.0  12.0  13.0  14.0  15.0  16.0  17.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">  9.0  10.0  11.0  12.0  13.0  14.0  15.0  16.0  17.0  18.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 10.0  11.0  12.0  13.0  14.0  15.0  16.0  17.0  18.0  19.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 11.0  12.0  13.0  14.0  15.0  16.0  17.0  18.0  19.0  20.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 12.0  13.0  14.0  15.0  16.0  17.0  18.0  19.0  20.0  21.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 13.0  14.0  15.0  16.0  17.0  18.0  19.0  20.0  21.0  22.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 14.0  15.0  16.0  17.0  18.0  19.0  20.0  21.0  22.0  23.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 15.0  16.0  17.0  18.0  19.0  20.0  21.0  22.0  23.0  24.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 16.0  17.0  18.0  19.0  20.0  21.0  22.0  23.0  24.0  25.0</span></span>
<span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> 17.0  18.0  19.0  20.0  21.0  22.0  23.0  24.0  25.0  26.0</span></span></code></pre></div>`,35),l=[t];function h(p,k,d,r,g,c){return a(),i("div",null,l)}const E=s(e,[["render",h]]);export{y as __pageData,E as default};
