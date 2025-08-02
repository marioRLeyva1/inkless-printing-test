export const buildMessage = (message: string) : string => {
  return JSON.stringify({
    type: "raw",
    data: "SG9sYSBtdW5kbw0KSW1wcmVzacOzbiBkZSBwcnViaW5hDQoNCg=="
  })
}