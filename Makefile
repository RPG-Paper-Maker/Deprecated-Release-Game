release:
	./bin/tag $(filter-out $@,$(MAKECMDGOALS))
