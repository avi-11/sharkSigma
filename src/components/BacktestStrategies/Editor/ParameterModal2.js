import { Modal, Button, Form, Select } from "antd";
import "./ParameterModal2.css";

const ParameterModal = ({ modalOpen }) => {
  const [form] = Form.useForm();

  const marketList = [
    { label: "India", value: "India" },
    { label: "US Largecap", value: "US Largecap" },
    { label: "US Midcap", value: "US Midcap" },
    { label: "US Smallcap", value: "US Smallcap" },
  ];

  const instrumentList = [
    { label: "ACC", value: "ACC" },
    { label: "ADANIENT", value: "ADANIENT" },
    { label: "ADANIPORTS", value: "ADANIPORTS" },
    { label: "ADANIPOWER", value: "ADANIPOWER" },
    { label: "AMARAJABAT", value: "AMARAJABAT" },
  ];

  return (
    <Modal
      open={true}
      title={
        <>
          <h3 style={{ color: "#D7D8DA" }}>Strategy Parameters</h3>
          <p
            style={{
              color: "#B5B5BA",
              borderBottom: "0.6px solid #8E959B",
              paddingBottom: "10px",
            }}
          >
            Set the parameters for your strategy
          </p>
        </>
      }
      size="large"
    >
      <Form form={form}>
        <Form.Item label="Market" name="market">
          <Select options={marketList} />
        </Form.Item>

        <Form.Item label="Instrument" name="instrument">
          <Select options={instrumentList} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ParameterModal;
