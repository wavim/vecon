import { vecon } from "vecon";

const frame = document.getElementById("frame") as HTMLDivElement;
const input = document.getElementById("input") as HTMLInputElement;

const margin = 150;
const render = (name?: string) => {
  frame.innerHTML = vecon(name?.length ? name : "damn", {
    margin,
    styles: "width: 100%;",
  });
};

render();
input.oninput = () => render(input.value);

// modified from https://stackoverflow.com/a/78708218
frame.onclick = async () => {
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(frame.innerHTML)}`;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const cvs = document.createElement("canvas");
  [cvs.width, cvs.height] = [800 + 2 * margin, 800 + 2 * margin];

  const ctx = cvs.getContext("2d")!;
  ctx.drawImage(image, 0, 0, 800 + 2 * margin, 800 + 2 * margin);

  const link = document.createElement("a");
  link.download = "vecon";
  link.href = cvs.toDataURL("image/png", 1);

  link.click();
  link.remove();
};
