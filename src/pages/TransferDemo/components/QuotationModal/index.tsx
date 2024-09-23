import { ModalForm, ProFormDatePicker } from '@ant-design/pro-components';
import { Form, Transfer, TransferProps } from 'antd';
import { FormInstance } from 'antd/lib';
import { useRef, useState } from 'react';
import './index.less';

interface QuotationModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onFinish: (values: any) => void;
  orderDatas: {
    key: string;
    title: string;
    description: string;
  }[];
}

const QuotationModal: React.FC<QuotationModalProps> = (props) => {
  // 测试数据
  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>(
    [],
  );
  const formRef = useRef<FormInstance>();
  const onChange: TransferProps['onChange'] = (
    nextTargetKeys,
    direction,
    moveKeys,
  ) => {
    formRef.current?.setFieldValue('orderDatas', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <ModalForm
      title="汇总报价"
      open={props.visible}
      formRef={formRef}
      onFinish={async (values: any) => {
        const targetOrderDatas = (targetKeys || []).map((key) =>
          props.orderDatas.find((item) => item.key === key),
        );
        const data = {
          month: values.month,
          orderDatas: props.orderDatas,
          targetOrderDatas: targetOrderDatas,
        };
        props.onFinish(data);
        props.setVisible(false);
      }}
      onOpenChange={(visible) => {
        props.setVisible(visible);
        if (!visible) {
          // 重置表单
          setTargetKeys([]);
          setSelectedKeys([]);
        }
      }}
      modalProps={{ destroyOnClose: true }}
    >
      <ProFormDatePicker.Month
        name="month"
        label="汇总月份"
        placeholder="请选择月份"
        rules={[{ required: true, message: '请选择月份' }]}
      />
      <Form.Item
        name="orderDatas"
        label="订单数据"
        rules={[{ required: true, message: '请选择订单' }]}
      >
        <Transfer
          dataSource={props.orderDatas}
          titles={['报价单', 'AC Sterilization']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          render={(item) => item.title}
          oneWay
          showSearch
          pagination
        />
      </Form.Item>
    </ModalForm>
  );
};

export default QuotationModal;
