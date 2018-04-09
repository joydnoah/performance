const HOTJAR_ID = process.env.HOTJAR_ID;
const HOTJAR_SNIPPET_VERSION = process.env.HOTJAR_SNIPPET_VERSION;

export function setup(component) {
  component.hotjar = document.createElement('script')
  component.hotjar.innerHTML = '(function(h,o,t,j,a,r){'
  component.hotjar.innerHTML += ' h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};'
  component.hotjar.innerHTML += ' h._hjSettings={hjid:' + HOTJAR_ID + ',hjsv:' + HOTJAR_SNIPPET_VERSION + '}; a=o.getElementsByTagName(\'head\')[0]; r=o.createElement(\'script\');'
  component.hotjar.innerHTML += ' r.async=1;'
  component.hotjar.innerHTML += ' r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;'
  component.hotjar.innerHTML += ' a.appendChild(r);'
  component.hotjar.innerHTML += ' })(window,document,\'https://static.hotjar.com/c/hotjar-\',\'.js?sv=\');'
  document.head.appendChild(component.hotjar)
}
