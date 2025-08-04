export const buildMessage = (message: string) : string => {
  return JSON.stringify({
    RawBT: [
      { TextLine: { text: "¡Boletomovil Rocks!" } },
      { QRCode: { data: "https://boletomovil.com" } },
      { FeedLine: { lines: 2 } },
      { CutPaper: {} }
    ]
  })
}