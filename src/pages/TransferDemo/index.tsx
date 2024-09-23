import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import QuotationModal from './components/QuotationModal';
import './index.less';
import { useQuotation } from './useQuotation';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

// 假设的数据源
const orderDatas = Array.from({ length: 20 }).map<RecordType>((_, i) => ({
  key: i.toString(),
  title: `订单${i + 1}`,
  description: `description of content${i + 1}`,
}));

const HomePage: React.FC = () => {
  const { modalVisible, onFinish, handleModalVisible } = useQuotation();

  return (
    <PageContainer>
      <Button type="primary" onClick={() => handleModalVisible(true)}>
        打开报价汇总表单
      </Button>
      <QuotationModal
        orderDatas={orderDatas}
        visible={modalVisible}
        setVisible={handleModalVisible}
        onFinish={onFinish}
      />
    </PageContainer>
  );
};

export default HomePage;
