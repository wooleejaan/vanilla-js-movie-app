import fetch from "node-fetch"
import { VercelRequest, VercelResponse } from "@vercel/node"

const { APIKEY } = process.env

export default async function handler(request: VercelRequest, response: VercelResponse){
  const { title, page, id } = JSON.parse(request.body)
  // id를 받으면 영화 상세 정보를 요청하는 것이고, 아니라면 일반적인 영화 목록을 요청하는 것으로 처리한다. 
  const url = id 
    ? `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full` 
    : `https://omdbapi.com?apikey=${APIKEY}&s=${title}&page=${page}`

  const res = await fetch(url)
  const json = await res.json()

  response
    .status(200)
    .json(json)
}