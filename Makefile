.PHONY: run run-frontend run-backend typecheck-backend

FRONTEND_DIR=frontend
BACKEND_DIR=backend

run:
	make run-frontend & make run-backend

run-frontend:
	cd $(FRONTEND_DIR) && pnpm install && pnpm run dev

run-backend:
	cd $(BACKEND_DIR) && source .venv/bin/activate && pip install -r requirements-dev.txt && fastapi dev app

typecheck-backend:
	@echo "Running Pyright type check..."
	@cd $(BACKEND_DIR) && source .venv/bin/activate && pip install pyright --upgrade && pyright app/
