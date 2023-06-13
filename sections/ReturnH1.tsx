export interface Props {
  title: string
}

const H1 = ({ title }: Props) => {
  return <h1>{title}</h1>
}

export default H1
