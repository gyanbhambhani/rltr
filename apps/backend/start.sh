#!/bin/bash

echo "🚀 RLTR Backend Setup"
echo "======================"

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env from env.example..."
    cp env.example .env
    echo "✅ .env created. Please edit it with your local settings."
    echo "   Key settings to configure:"
    echo "   - SECRET_KEY (generate a secure random string)"
    echo "   - POSTGRES_URL (if using local Postgres)"
    echo "   - REDIS_URL (if using local Redis)"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Test imports
echo "🧪 Testing imports..."
python3 test_setup.py

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup complete! Next steps:"
    echo "1. Edit .env with your configuration"
    echo "2. Start the stack: make compose"
    echo "3. Run migrations: make migrate"
    echo "4. Start the API: make run"
    echo ""
    echo "Happy coding! 🚀"
else
    echo "❌ Setup failed. Check the errors above."
    exit 1
fi
