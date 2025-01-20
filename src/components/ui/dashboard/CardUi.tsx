import { Card } from "antd";

type TCardProps = {
  title: string;
  data: number | string;
  loading: boolean;
};

const CardUi = ({ title, data, loading }: TCardProps) => {
  return (
    <Card
      style={{
        textAlign: "center",
        fontSize: "40px",
        fontWeight: "bold",
        color: loading ? "#ccc" : "#333",
      }}
      title={title}
      bordered={false}>
      {data}
    </Card>
  );
};

export default CardUi;
