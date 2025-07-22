run:
	@parallel --linebuffer --tagstring '{#}' ::: \
		"npm run watch" \
		"rojo serve"