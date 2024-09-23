import { message } from 'antd';
import { useState } from 'react';

export const useQuotation = (initialVisible = false) => {
  const [modalVisible, setModalVisible] = useState(initialVisible);

  const onFinish = (data: any) => {
    console.log('Success %c⧭', 'color: #aa00ff', data);
    message.success('提交成功，通过console查看结果');
    setModalVisible(false);
  };

  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
  };

  return {
    modalVisible,
    onFinish,
    handleModalVisible,
  };
};
