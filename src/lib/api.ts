const API_URL = 'https://script.google.com/macros/s/AKfycbxNI_qyVD1FiyyKFnGPnWjmO9bieG2RNoMoJsC2-KDoznqY_kKUmg47Eq3j8JrqYiiL/exec'

export async function uploadFile(base64: string, filename: string): Promise<boolean> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: base64,
        filename: filename
      })
    })

    if (!response.ok) {
      console.error('[Upload Error]', await response.text())
      return false
    }

    const result = await response.json()
    console.log('[Upload Success]', result)
    return result.success === true
  } catch (error) {
    console.error('[Upload Exception]', error)
    return false
  }
}