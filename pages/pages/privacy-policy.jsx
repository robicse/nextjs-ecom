import ShopLayout1 from "components/layouts/ShopLayout1";
import api from "utils/api/superstore-shop";
import parse from 'html-react-parser';
import { Box, Container } from "@mui/material";

const IndexPage = (props) => {
  const {
    generalSetting,
    getPrivacyPolicy
  } = props;

  const title = 'Privacy Policy';

  return (
    
    <ShopLayout1 title={title} generalSetting={generalSetting}>
    <>
      <Box>
        <Container
          sx={{
            p: "1rem"
          }}
        >
          <Box> 
            {getPrivacyPolicy && getPrivacyPolicy.map((item) => {
              return parse(item.content)
            }
            )}
          </Box>
        </Container>
      </Box>
    </>
    </ShopLayout1>
  );
};

export async function getStaticProps() {
  const generalSetting = await api.generalSetting();
  const getPrivacyPolicy = await api.getPrivacyPolicy();
  return {
    props: {
      generalSetting,
      getPrivacyPolicy
    },
  };
}
export default IndexPage;
