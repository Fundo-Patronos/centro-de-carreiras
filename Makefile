.PHONY: run run-frontend run-backend

FRONTEND_DIR=frontend
BACKEND_DIR=backend

run-frontend:
	cd $(FRONTEND_DIR) && pnpm install && pnpm run dev

run-backend:
	cd $(BACKEND_DIR) && source .venv/bin/activate && pip install -r requirements-dev.txt && uvicorn app:app --reload

run:
	make run-frontend & make run-backend
