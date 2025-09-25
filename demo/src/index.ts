import { vecon } from "vecon";

const frame = document.getElementById("frame") as HTMLDivElement;
const input = document.getElementById("input") as HTMLInputElement;

const space = 150;
const paint = () => {
  frame.innerHTML = vecon(input.value, { space, style: "width: 100%;" });
};

paint();
input.oninput = paint;

// modified from https://stackoverflow.com/a/78708218
frame.onclick = async () => {
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(frame.innerHTML)}`;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const cvs = document.createElement("canvas");
  [cvs.width, cvs.height] = [800 + 2 * space, 800 + 2 * space];

  const ctx = cvs.getContext("2d")!;
  ctx.drawImage(image, 0, 0, 800 + 2 * space, 800 + 2 * space);

  const link = document.createElement("a");
  link.download = `vecon-'${input.value}'`;
  link.href = cvs.toDataURL("image/png", 1);

  link.click();
  link.remove();
};
