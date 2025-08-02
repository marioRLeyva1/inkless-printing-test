export const buildMessage = (message: string) : string => {
  return JSON.stringify({
    type: "text",
    text: message
  })
}