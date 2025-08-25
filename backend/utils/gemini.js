import axios from "axios"

const geminiData = async(message)=>{
 try {
   const {data} = await axios.post(process.env.GEMINI_URL,{
     "contents": [
      {
        "parts": [
          {
            "text": message
          }
        ]
      }
    ]
   })
 
   const testRespo = data.candidates[0].content.parts[0].text
   return testRespo
  } catch (error) {
    console.log(error)
  }
}

export default geminiData