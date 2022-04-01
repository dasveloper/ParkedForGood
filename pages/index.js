import axios from 'axios';
import Layout from '../components/layout';

export default function MePage() {
  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/domains', { domain: 'https://google.com' });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout>
      Home
      <button type="button" onClick={handleSubmit}>Add domain</button>
    </Layout>
  );
}
