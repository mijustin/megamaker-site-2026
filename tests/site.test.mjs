import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('published pages keep membership closed and ship no application UI or scripts', async () => {
  for (const path of ['index.html', 'join/index.html', '404.html']) {
    const html = await read(path);
    assert.doesNotMatch(html, /<(form|input|script)\b/i);
    assert.doesNotMatch(html, /href="\/(login|members|lists\/projects|newsletter|podcast)(?:["/?])/i);
    assert.doesNotMatch(html, /stripe\.com|intercom|livewire|ucarecdn\.com/i);
    assert.match(html, /mailto:words@megamaker\.co/);
    if (path !== '404.html') {
      assert.match(html, /Not accepting new members at this time\./);
      assert.doesNotMatch(html, /name="robots"/);
    }
  }
  const home = await read('index.html');
  assert.match(home, /lifetime of the site, not your individual lifetime/);
  assert.match(home, /Robert Williams/);
  assert.match(home, /youtube-nocookie\.com\/embed\/bgOowqCx8kM/);
  assert.match(home, /rel="canonical" href="https:\/\/megamaker\.co\/"/);
  assert.match(await read('404.html'), /name="robots" content="noindex, nofollow"/);
  assert.match(await read('robots.txt'), /Sitemap: https:\/\/megamaker\.co\/sitemap-index.xml/);
  assert.match(await read('sitemap-0.xml'), /https:\/\/megamaker\.co\//);
});
