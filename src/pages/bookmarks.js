import { useState } from 'react'
import { NextSeo } from 'next-seo'

// --- Components
import Card from 'components/Card'
import Layout from 'components/Layout'
import PageHeading from 'components/PageHeading'

// --- Others
import { raindropCollections } from 'lib/constants'
import getBookmarks from 'lib/raindrop'
import { ogImageUrl } from 'lib/helper'

const url = 'https://onur.dev/bookmarks'
const title = 'Bookmarks — Onur Şuyalçınkaya'

const Bookmarks = ({ readings, personalSites, UIs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  /* console.log('readings :>> ', readings)
  console.log('personalSites :>> ', personalSites)
  console.log('UIs :>> ', UIs) */

  const rtf = new Intl.RelativeTimeFormat('en', {
    style: 'long',
    numeric: 'auto'
  })

  const diffByDays = (from) => {
    const date = new Date(from)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
    return rtf.format(diffDays * -1, 'days')
  }

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
          images: [
            {
              url: ogImageUrl('**Bookmarks**'),
              alt: title
            }
          ]
        }}
      />
      <Layout>
        <PageHeading heading="Bookmarks" description="Internet things, saved for later." />
        <div>
          <div role="tablist" aria-orientation="horizontal" className="flex flex-start flex-row justify-around">
            {Object.values(raindropCollections).map((item, itemIndex) => (
              <button
                key={`tabItem_${itemIndex}`}
                className={`flex-1 py-2 px-4 font-semibold border-b-2 outline-none focus:outline-none hover:text-primary-default transition-colors duration-200 ${
                  itemIndex === activeTabIndex ? 'text-primary-default border-primary-default' : 'text-gray-600'
                }`}
                onClick={() => itemIndex !== activeTabIndex && setActiveTabIndex(itemIndex)}
              >
                {item}
              </button>
            ))}
          </div>
          <div>
            {activeTabIndex === 0 && (
              <div className="space-y-6 mt-6 divide divide-y-2">
                {personalSites.map((personalSite, personalSiteIndex) => (
                  <div key={`personalSite_${personalSiteIndex}`} className="first:pt-0 pt-6">
                    <Card
                      title={personalSite.domain}
                      primaryText={diffByDays(personalSite.created)}
                      // secondaryText={personalSite.excerpt}
                      url={personalSite.link}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeTabIndex === 1 && (
              <div className="space-y-6 mt-6 divide divide-y-2">
                {readings.map((readingItem, readingItemIndex) => (
                  <div key={`readingItem_${readingItemIndex}`} className="first:pt-0 pt-6">
                    <Card
                      title={readingItem.title}
                      // primaryText={readingItem.domain}
                      primaryText={diffByDays(readingItem.created)}
                      // secondaryText={readingItem.excerpt}
                      secondaryText={readingItem.domain}
                      url={readingItem.link}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeTabIndex === 2 && (
              <div className="space-y-6 mt-6 divide divide-y-2">
                {UIs.map((item, itemIndex) => (
                  <div key={`ui_${itemIndex}`} className="first:pt-0 pt-6">
                    <Card
                      title={item.title}
                      primaryText={diffByDays(item.created)}
                      secondaryText={item.excerpt}
                      url={item.link}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const data = await getBookmarks()

  /* const dataGroupByDay = groupBy(data, (item) => {
    return format(parseISO(item.created), 'd MMMM yyyy', { locale: tr })
  }) */

  const personalSites = data.items.filter((item) => item.collectionId === Number(Object.keys(raindropCollections)[0]))
  const readings = data.items.filter((item) => item.collectionId === Number(Object.keys(raindropCollections)[1]))
  const UIs = data.items.filter((item) => item.collectionId === Number(Object.keys(raindropCollections)[2]))

  /* const all = [...readingItems, ...personalSitesItems, ...uiItems].sort(
    (a, b) => Number(new Date(b.created)) - Number(new Date(a.created))
  ) */

  return {
    props: {
      // all,
      readings,
      personalSites,
      UIs
    },
    revalidate: 600
  }
}

export default Bookmarks
