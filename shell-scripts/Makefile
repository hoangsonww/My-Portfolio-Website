# Makefile for Son Nguyen Hoang Portfolio (static site)
# ------------------------------------------------------
# Usage:
#   make [target]
# Default target is `all` which runs: lint → build → test-links
#
# Prerequisites:
#   - Node.js & npm
#   - optipng, jpegoptim, python3 (for http.server)
#   - rsync (for deploy)
#
# You can tweak DEST, SERVER, etc. below.

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# CONFIGURATION
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

# Where to put the built site
DEST      := dist

# Remote server for `make deploy`
RSYNC_DEST   := user@your.server.com:/var/www/sonnguyenhoang.com

# Tools installed via npm
HTMLHINT     := ./node_modules/.bin/htmlhint
STYLELINT    := ./node_modules/.bin/stylelint
ESLINT       := ./node_modules/.bin/eslint
CLEANCSS     := ./node_modules/.bin/cleancss
UGLIFYJS     := ./node_modules/.bin/uglifyjs
IMAGEMIN     := ./node_modules/.bin/imagemin
LINKINATOR   := ./node_modules/.bin/linkinator

# Source directories
SRC          := .
CSS_SRC      := packages/css
JS_SRC       := packages/js
IMG_SRC      := packages/images
PDF_SRC      := packages/pdf

# File globs
HTML_FILES   := $(shell find $(SRC) -maxdepth 1 -name '*.html')
CSS_FILES    := $(shell find $(CSS_SRC) -name '*.css')
JS_FILES     := $(shell find $(JS_SRC) -name '*.js')
IMG_FILES    := $(shell find $(IMG_SRC) -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \))

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# PHONY
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
.PHONY: all setup lint lint-html lint-css lint-js build clean \
        copy-html copy-css copy-js copy-images copy-pdf \
        minify-css minify-js optimize-images test-links serve deploy

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# DEFAULT
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
all: lint build test-links
	@echo "\n✅  All tasks complete."

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# SETUP (install dev dependencies)
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
setup:
	@echo "🔧 Installing npm dev‐tools…"
	npm install --save-dev \
	  htmlhint stylelint eslint \
	  clean-css-cli uglify-js imagemin-cli linkinator

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# LINT
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
lint: lint-html lint-css lint-js

lint-html:
	@echo "🔍 Linting HTML…"
	$(HTMLHINT) $(HTML_FILES)

lint-css:
	@echo "🔍 Linting CSS…"
	$(STYLELINT) "$(CSS_SRC)/**/*.css"

lint-js:
	@echo "🔍 Linting JS…"
	$(ESLINT) $(JS_SRC)

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# BUILD (prep and minify)
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
build: clean copy-html copy-css copy-js copy-images copy-pdf \
       minify-css minify-js optimize-images
	@echo "📦 Build complete in $(DEST)/"

clean:
	@echo "🧹 Cleaning $(DEST)/…"
	rm -rf $(DEST)

copy-html:
	@echo "📄 Copying HTML…"
	mkdir -p $(DEST)
	cp $(HTML_FILES) $(DEST)/

copy-css:
	@echo "🎨 Copying CSS…"
	mkdir -p $(DEST)/$(CSS_SRC)
	cp -r $(CSS_SRC)/* $(DEST)/$(CSS_SRC)/

copy-js:
	@echo "💻 Copying JS…"
	mkdir -p $(DEST)/$(JS_SRC)
	cp -r $(JS_SRC)/* $(DEST)/$(JS_SRC)/

copy-images:
	@echo "🖼️  Copying images…"
	mkdir -p $(DEST)/$(IMG_SRC)
	cp -r $(IMG_SRC)/* $(DEST)/$(IMG_SRC)/

copy-pdf:
	@echo "📑 Copying PDF…"
	mkdir -p $(DEST)/$(PDF_SRC)
	cp -r $(PDF_SRC)/* $(DEST)/$(PDF_SRC)/

minify-css:
	@echo "🗜️  Minifying CSS…"
	@for f in $(DEST)/$(CSS_SRC)/*.css; do \
	  $(CLEANCSS) -o $$f.min.css $$f; \
	  mv $$f.min.css $$f; \
	done

minify-js:
	@echo "🗜️  Minifying JS…"
	@for f in $(DEST)/$(JS_SRC)/*.js; do \
	  $(UGLIFYJS) $$f -c -m -o $$f.min.js; \
	  mv $$f.min.js $$f; \
	done

optimize-images:
	@echo "🗜️  Optimizing images…"
	@find $(DEST)/$(IMG_SRC) -type f -iname '*.png'  -exec optipng -o7 {} \;
	@find $(DEST)/$(IMG_SRC) -type f -iname '*.jpg' -exec jpegoptim --max=85 {} \;

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# TEST BROKEN LINKS
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
test-links:
	@echo "🔗 Checking for broken links…"
	$(LINKINATOR) $(DEST) --skip ./packages/images --silent
	@echo "✅ No broken links found."

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# LOCAL SERVER
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
serve:
	@echo "🚀 Serving at http://localhost:8000"
	@cd $(DEST) && python3 -m http.server 8000

#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# DEPLOY (rsync)
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
deploy: all
	@echo "🚚 Deploying to $(RSYNC_DEST)…"
	rsync -avz --delete $(DEST)/ $(RSYNC_DEST)
	@echo "✅ Deployed successfully!"
