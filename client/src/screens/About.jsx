const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full min-h-screen">
        {/* Background image with reduced opacity */}
        <div className="absolute inset-0 bg-cover bg-center bg-[url('https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg')] opacity-100"></div>

        {/* Content container */}
        <div className="relative flex flex-col items-center justify-center h-full space-y-4">
          <div className=" flex gap-1 text-white text-3xl font-bold bg-gray-900 bg-opacity-85 p-6 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
              />
            </svg>
            About BookHaven
          </div>
          <div className="bg-gray-900 bg-opacity-85 mx-8 p-6 rounded text-white">
            <h1 className="text-3xl font-bold">Explore Our Vast Collection</h1>
            <p className="mt-2">
              At BookHaven, we pride ourselves on our extensive and diverse
              collection of books across various genres. Whether you are looking
              for the latest bestsellers, timeless classics, gripping thrillers,
              enlightening non-fiction, or heartwarming romances, you will find
              it all here. Our user-friendly interface allows you to browse
              through our catalog effortlessly, ensuring you can find exactly
              what you are looking for.
            </p>
          </div>
          <div className="bg-gray-900 bg-opacity-85 mx-8 p-6 rounded text-white">
            <h1 className="text-3xl font-bold">
              Instant Access to Digital Copies
            </h1>
            <p className="mt-2">
              We understand the joy of instant gratification, which is why
              BookHaven offers immediate access to digital copies of selected
              books. With just a few clicks, you can purchase and download your
              favorite titles directly to your device, ready to read at your
              convenience. For those who enjoy reading on the go, our platform
              ensures that your digital library is always at your fingertips.
            </p>
          </div>
          <div className="bg-gray-900 bg-opacity-85 mx-8 p-6 rounded text-white">
            <h1 className="text-3xl font-bold">Free PDF Downloads</h1>
            <p className="mt-2">
              In addition to our paid digital copies, BookHaven provides free
              PDF downloads for a variety of books. This feature is designed to
              make reading more accessible to everyone, offering a chance to
              explore new genres and authors without any cost. We believe that
              literature should be available to all, and our free PDF section is
              a testament to this commitment.
            </p>
          </div>
          <div className="bg-gray-900 bg-opacity-85 mx-8 p-6 rounded text-white">
            <h1 className="text-3xl font-bold">A Community of Book Lovers</h1>
            <p className="mt-2">
              BookHaven is more than just an online bookstore; it is a community
              of avid readers and literature enthusiasts. Join us in celebrating
              the world of books, sharing recommendations, and connecting with
              fellow book lovers. Our platform is designed to foster a love for
              reading and to support authors by bringing their works to a wider
              audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
