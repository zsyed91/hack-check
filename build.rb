# Firefox OS App builder
require "FileUtils"


# Clear out target folders
target_folders = ["assets/css", "assets/js"]

target_folders.each do |folder|
	FileUtils.remove_dir(folder)
	FileUtils.mkdir(folder)
end


# Move *.css files first
cssFiles = Dir["styles/*.css"]

cssFiles.each do |css|
	css.slice! "styles/"
    FileUtils.copy("styles/#{css}", "assets/css/#{css}")
end


jsFiles  = Dir["scripts/*.js"]

jsFiles.each do |js|
	js.slice! "scripts/"
	FileUtils.copy("scripts/#{js}", "assets/js/#{js}")
end

# Compile SASS files
sassFiles = Dir["styles/sass/**/*.scss"]

sassFiles.each do |sass|
	sass.slice! "styles/sass/"
	sass.slice! ".scss"
	
	system("sass --style compressed styles/sass/#{sass}.scss assets/css/#{sass}.css")
end	