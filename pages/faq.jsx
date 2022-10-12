import ShopLayout1 from "components/layouts/ShopLayout1";
import { useRouter } from 'next/router';
import api from "utils/api/superstore-shop";

const IndexPage = (props) => {
  const {
    generalSetting,
  } = props;

  const { asPath, pathname } = useRouter();
  // console.log(pathname)
  const defaulCategoryShow = pathname == '/' ? true : false


  return (
    <ShopLayout1 generalSetting={generalSetting}>
<>
    <div className="container">
        <div id="about" className="row about-section">
          
          <div className="col-lg-8 about-card">
          <h2 className="mb-5 pb-4"><span className="text-danger">FAQ </span> </h2>
          <p>MR X was born in Baidya Belgharia, a small village located in the Natore where life is full of simplicity yet challenges. Mr. Rafel, the eldest son of a school teacher and a housewife, was raised to be a person who knew his responsibilities since the boyhood. With a strong commitment to the family and devotion to pursue his own career goal, he has always been proactive when it comes to innovation and growth.</p><br/>
           <p>His thirst for knowledge and success brought him a wealth of experience in sales and marketing and business development in Bangladeshi IT industry and made him a role model for many aspiring professionals. He earned a B. Sc. (Software Security System), M. Sc. (ESAM, MDM), PMP (PMI), and Escils Certified Specialist (SEO, SMM, Affiliate Marketing, and Digital Marketing) with great distinctions.</p><br/>
            <p>He co-founded StarIT Inc. that specializes in outbound call center services, digital marketing, and other IT-enabled services. Under his direct supervision, StarIT is currently serving thousands of clients from across the Bangladesh and the United States with tremendous potential to expand the line of services to Europe, Middle East, and other Asian regions.</p><br/>
            <p>The dream about creating a rideshare app started at StarIT two years ago. Since then, it was Rafel whose relentless efforts resulted in the release of Rideox app. As a responsible CEO, he oversees everything regarding development and promotion of the business.</p>
            <p>He has been selected as a Global Youth Peace Ambassador 2018-2019. As a Motivational Speaker at WSDA, New Zealand, he delivered a memorable speech that inspired thousands of youths toward the path of skill development. He is also a Member of the Standing Committee (Call Centre & BPO), Bangladesh Association of Software and Information Services (BASIS).</p><br/>
            <p>The vision to take his company to the peak of excellence and reputation keeps him busy making plan and strategies for organizational performance and achieving the desired growth each year. AND when he is not working, which rarely happens, he likes to read books, watch movies, or spend time with family and friends. His decade-long dedication and experience can be valuable to those who are getting interested in contributing to the field of Information Technology.</p>
          </div>
          
        </div>
      </div>
    </>
    </ShopLayout1>
  );
};

export async function getStaticProps() {
  const generalSetting = await api.generalSetting();

  return {
    props: {
      generalSetting,
    },
  };
}
export default IndexPage;
