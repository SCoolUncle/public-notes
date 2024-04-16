
/**
 * 生成水印
 * canvas https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
 * @param param0 {
 *  container?: HTMLElement,
 }
 */

 interface PropsType {
  container?: HTMLElement
  content?: string
  [propName: string]: any
 }

export function generateWaterMark({
  container = document.body,
  width = '300px',
  height = '200px',
  textAlign = 'center',
  textBaseline = 'middle',
  font = '22px Microsoft Yahei',
  fillStyle = 'rgba(100, 100, 100, 0.15)',
  content = '水印文字',
  rotate = '-20',
  zIndex = 999,
} : PropsType):void {
  const args = arguments[0];
  const canvas = document.createElement('canvas');

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  const ctx: any = canvas.getContext('2d');

  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
  // canvas转换成dataURL
  const imageBase64Url = canvas.toDataURL();
  // 是否有遮罩层
  const __wm = document.querySelector('.__wm');

  const watermarkDiv = __wm || document.createElement('div');
  // 需要使用pointer-events事件穿透
  const styleStr = `
    pointer-events:none;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    background-repeat:repeat;
    background-image:url('${imageBase64Url}')`;

  watermarkDiv.setAttribute('style', styleStr);
  watermarkDiv.classList.add('__wm');

  if (!__wm) {
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  if (MutationObserver) {
    let mo:MutationObserver | null = new MutationObserver(function () {
      const __wm = document.querySelector('.__wm');
      // 只在__wm元素变动才重新调用 generateWaterMark
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        // 取消上次观察
        mo?.disconnect();
        mo = null;
        generateWaterMark({...args});
      }
    });

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }
}
