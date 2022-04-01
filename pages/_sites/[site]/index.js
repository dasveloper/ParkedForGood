import DefaultErrorPage from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Site = ({ workspace }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return workspace ? (
    <main className="relative flex flex-col items-center justify-center h-screen space-y-10 text-gray-800 bg-gray-50">
      <pre>
        {JSON.stringify(workspace)}
      </pre>
    </main>
  ) : (
    <DefaultErrorPage statusCode={404} />
  );
};

export const getStaticPaths = async () => {
  const paths = await getWorkspacePaths();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { site } = params;
  const siteWorkspace = await getSiteWorkspace(site, site.includes('.'));
  let workspace = null;

  if (siteWorkspace) {
    const { host } = new URL(process.env.APP_URL);
    workspace = {
      domains: siteWorkspace.domains,
      name: siteWorkspace.name,
      hostname: `${siteWorkspace.slug}.${host}`,
    };
  }

  return {
    props: { workspace },
    revalidate: 10,
  };
};

export default Site;
