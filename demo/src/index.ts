import { vecon } from "vecon";

const frame = document.getElementById("frame") as HTMLDivElement;
const input = document.getElementById("input") as HTMLInputElement;

const render = () => {
  frame.innerHTML = vecon(input.value, { space: 200, style: "width: 100%;" });
};

render();
input.oninput = render;

// modified from https://stackoverflow.com/a/78708218
frame.onclick = async () => {
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(frame.innerHTML)}`;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const cvs = document.createElement("canvas");
  [cvs.width, cvs.height] = [1200, 1200];

  const ctx = cvs.getContext("2d")!;
  ctx.drawImage(image, 0, 0, 1200, 1200);

  const link = document.createElement("a");
  link.download = `vecon-'${input.value}'`;
  link.href = cvs.toDataURL("image/png", 1);

  link.click();
  link.remove();
};
