import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.DGqM5Bn9.js";const g=JSON.parse('{"title":"Combine YAXArrays","description":"","frontmatter":{},"headers":[],"relativePath":"UserGuide/combine.md","filePath":"UserGuide/combine.md","lastUpdated":null}'),e={name:"UserGuide/combine.md"},t=n(`<h1 id="Combine-YAXArrays" tabindex="-1">Combine YAXArrays <a class="header-anchor" href="#Combine-YAXArrays" aria-label="Permalink to &quot;Combine YAXArrays {#Combine-YAXArrays}&quot;">​</a></h1><p>Data is often scattered across multiple files and corresponding arrays, e.g. one file per time step. This section describes methods on how to combine them into a single YAXArray.</p><h2 id="cat-along-an-existing-dimension" tabindex="-1"><code>cat</code> along an existing dimension <a class="header-anchor" href="#cat-along-an-existing-dimension" aria-label="Permalink to &quot;\`cat\` along an existing dimension {#cat-along-an-existing-dimension}&quot;">​</a></h2><p>Here we use <code>cat</code> to combine two arrays consisting of data from the first and the second half of a year into one single array containing the whole year. We glue the arrays along the first dimension using <code>dims = 1</code>: The resulting array <code>whole_year</code> still has one dimension, i.e. time, but with 12 instead of 6 elements.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> YAXArrays</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">first_half </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> YAXArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dim{:time}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">second_half </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> YAXArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dim{:time}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">whole_year </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(first_half, second_half, dims </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭────────────────────────────────╮</span></span>
<span class="line"><span>│ 12-element YAXArray{Float64,1} │</span></span>
<span class="line"><span>├────────────────────────────────┴──────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ time Sampled{Int64} [1, 2, …, 11, 12] ForwardOrdered Regular Points</span></span>
<span class="line"><span>├───────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Dict{String, Any}()</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────── file size ┤ </span></span>
<span class="line"><span>  file size: 96.0 bytes</span></span>
<span class="line"><span>└───────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="concatenatecubes-to-a-new-dimension" tabindex="-1"><code>concatenatecubes</code> to a new dimension <a class="header-anchor" href="#concatenatecubes-to-a-new-dimension" aria-label="Permalink to &quot;\`concatenatecubes\` to a new dimension {#concatenatecubes-to-a-new-dimension}&quot;">​</a></h2><p>Here we use <code>concatenatecubes</code> to combine two arrays of different variables that have the same dimensions. The resulting array <code>combined</code> has an additional dimension <code>variable</code> indicating from which array the element values originates. Note that using a <code>Dataset</code> instead is a more flexible approach in handling different variables.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> YAXArrays</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">temperature </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> YAXArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dim{:time}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">precipitation </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> YAXArray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dim{:time}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cubes </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [temperature,precipitation]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">var_axis </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dim{:variable}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;temp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;prep&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">combined </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> concatenatecubes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(cubes, var_axis)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭─────────────────────────╮</span></span>
<span class="line"><span>│ 6×2 YAXArray{Float64,2} │</span></span>
<span class="line"><span>├─────────────────────────┴──────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ time     Sampled{Int64} 1:6 ForwardOrdered Regular Points,</span></span>
<span class="line"><span>  → variable Categorical{String} [&quot;temp&quot;, &quot;prep&quot;] ReverseOrdered</span></span>
<span class="line"><span>├────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Dict{String, Any}()</span></span>
<span class="line"><span>├───────────────────────────────────────────────────── file size ┤ </span></span>
<span class="line"><span>  file size: 96.0 bytes</span></span>
<span class="line"><span>└────────────────────────────────────────────────────────────────┘</span></span></code></pre></div>`,10),p=[t];function l(h,k,r,d,o,c){return a(),i("div",null,p)}const y=s(e,[["render",l]]);export{g as __pageData,y as default};
