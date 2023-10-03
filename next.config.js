/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/neatcoder',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
