function pngDataURLFromCanvas(canvas: HTMLCanvasElement): string {
    const pngDataURL = canvas.toDataURL();

    return pngDataURL;
}

export function pngObjectURLFromCanvas(canvas: HTMLCanvasElement): string {
    const pngDataURL = pngDataURLFromCanvas(canvas);
    const prefix = `data:image/png;base64,`;

    if (!pngDataURL.startsWith(prefix)) {
        throw new Error(`pngDataURL is not valid`);
    }

    const pngData = arrayBufferFromBase64String(pngDataURL.substring(prefix.length));

    const blob = new Blob([pngData], { type: `image/png` });

    const objectURL = URL.createObjectURL(blob);
    
    return objectURL;
}

/**
 * Creates a CUR file containing the canvas' content and returning its object URL
 * 
 * @param canvas 
 * @param hotspot The hotspot of the cursor (must be set in the CUR file and can not be overwritten in Edge with CSS)
 */
export function curObjectURLFromCanvas(canvas: HTMLCanvasElement, hotspot: { x: number, y: number } = { x: 0, y: 0 }): string {
    const pngDataURL = pngDataURLFromCanvas(canvas);
    const prefix = `data:image/png;base64,`;

    if (!pngDataURL.startsWith(prefix)) {
        throw new Error(`pngDataURL is not valid`);
    }

    const pngData = arrayBufferFromBase64String(pngDataURL.substring(prefix.length));

    const pngDataBlob = new Blob([pngData], { type: `image/png` });
    
    const imageDataOffset = 6 + 16;

    const curBlob = new Blob([
        curFileHeader(),
        curICONDIRENTRY(canvas.width, canvas.height, pngData.byteLength, imageDataOffset, hotspot),
        pngData
    ], { type: `image/x-icon` });

    const objectURL = URL.createObjectURL(curBlob);
    
    return objectURL;
}

function curFileHeader(imageCount = 1): ArrayBuffer {
    // see https://en.wikipedia.org/wiki/ICO_(file_format)

    const buffer = new ArrayBuffer(6); //a.buffer;
    const view = new DataView(buffer);

    view.setUint16(0, 0, true); // Reserved, 0
    view.setUint16(2, 2, true); // image type: 2 means CUR file format
    view.setUint16(4, imageCount, true); // number of images in the file

    return buffer;
}

function curICONDIRENTRY(width: number, height: number, imageSizeBytes: number, imageDataOffset: number, hotspot: {x: number, y: number}): ArrayBuffer {
    // see https://en.wikipedia.org/wiki/ICO_(file_format)

    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);

    view.setUint8(0, width % 256); // width, (0 means 256)
    view.setUint8(1, height % 256); // height, (0 means 256)
    view.setUint8(2, 0); // color palette
    view.setUint8(3, 0); // Reserved, should be 0
    view.setUint16(4, hotspot.x, true); // hotspot x
    view.setUint16(6, hotspot.y, true); // hotspot y
    view.setUint32(8, imageSizeBytes, true); // image size in bytes
    view.setUint32(12, imageDataOffset, true); // offset of the image data in bytes from beginning of file

    return buffer;
}

function arrayBufferFromBase64String(base64String: string): ArrayBuffer {
    const binaryString = window.atob(base64String);
    const byteArray = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    return byteArray.buffer;
}
