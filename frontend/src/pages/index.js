import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as AppLayout } from 'src/layouts';
import Projects from './projects';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo />
      <main>
       <Projects/>
      </main>
    </>
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
