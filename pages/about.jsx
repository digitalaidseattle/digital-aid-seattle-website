export default function Example() {
  return (
    <div className="relative overflow-hidden py-16">
      <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
        <div
          className="relative mx-auto h-full max-w-prose text-lg"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200 dark:text-gray-600"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200 dark:text-gray-600"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
        </div>
      </div>
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-lg font-semibold text-indigo-600 dark:text-indigo-300">
              Welcome to
            </span>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight  sm:text-4xl">
              Open Seattle
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-500 dark:text-gray-200">
            People across thousands of Seattle civic and nonprofit organizations
            have dedicated their lives to making the world safer, more
            equitable, and more sustainable. This work is responsible for so
            much good in the world, and we owe them a huge debt of gratitude.
          </p>
        </div>
        <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500 dark:text-gray-200">
          <p>
            Unfortunately, many of these organizations lack access to digital
            tools that are vital to success in the modern age. Nonprofits
            struggle to create and scale their impact without the resources they
            need.
          </p>

          <p>
            Just outside their doors is a fleet of experts and technologists
            with the talent, capacity, and drive to build.
          </p>

          <p>
            Seattle is world-renowned as a hub for technology talent, full of
            motivated builders, designers, and creators that want to use their
            skills for good. Open Seattle is bringing these communities together
            to create a sum greater than its parts.
          </p>
        </div>
      </div>
    </div>
  )
}
