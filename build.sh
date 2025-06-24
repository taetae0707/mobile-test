#!/bin/sh


#!/bin/sh

# mkdir -p output
# cp -R ./src ./public ./package.json ./next.config.mjs ./tsconfig.json ./yarn.lock ./output


cd ../
mkdir output
cp -R ./web/* ./output
cp -R ./output ./web/

# mkdir -p output
# cp -R ./* ./output
