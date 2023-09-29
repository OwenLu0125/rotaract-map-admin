export type Authentication =
  {
    accessToken: string
  }

export type Register = {
  username: string,
  mobile: string,
  password: string,
  role: string
}

export type Result = {
  result: "F" | "S",
  resultMsg: string
}