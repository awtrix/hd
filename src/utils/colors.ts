export type Color = String | [number, number, number]

export default function colorToBuffer (color: Color): Buffer {
  if (Array.isArray(color)) {
    return Buffer.from(color)
  }

  const hexRegex = /#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/
  let [_, ...colors] = color.match(hexRegex) || []

  return Buffer.from(colors.map(color => parseInt(color, 16)))
}
