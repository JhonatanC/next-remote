import { Suspense } from "react";

interface WordPressPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
}

async function getInicioPage(): Promise<WordPressPage | null> {
  try {
    const res = await fetch(
      "https://duomolab.com/wordpress/wp-json/wp/v2/pages?slug=inicio",
      {
        next: {
          revalidate: 10,
          tags: ["inicio"],
        },
      },
    );

    if (!res.ok) return null;

    const pages: WordPressPage[] = await res.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error("Error conectando con WordPress:", error);
    return null;
  }
}

export default async function Home() {
  const pageData = await getInicioPage();

  if (!pageData) return <p>No se encontró la página</p>;

  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <main>
        <h1>{pageData.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
      </main>
    </Suspense>
  );
}
