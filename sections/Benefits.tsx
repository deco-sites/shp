export interface Props {
  Benefit?: Array<{
    iconUrl: string;
    text: string;
  }>;
}

const Benefits = ({ Benefit }: Props) => {
  return (
    <div>
      {Benefit?.map((el) => (
        <>
          <img src={el.iconUrl} alt="icon" />
          <h1>{el.text}</h1>
        </>
      ))}
    </div>
  );
};

export default Benefits;
