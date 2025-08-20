#!/usr/bin/env python3
"""
Quick test script to verify the backend setup
"""
import os
import sys

def test_imports():
    """Test that all modules can be imported"""
    try:
        from app.core.config import settings
        print("✓ Config imported successfully")
        
        from app.core.db import engine, SessionLocal
        print("✓ Database configured successfully")
        
        from app.core.security import create_access_token
        print("✓ Security utilities imported successfully")
        
        from app.models.property import Property
        print("✓ Property model imported successfully")
        
        from app.schemas.property import PropertyCreate
        print("✓ Property schemas imported successfully")
        
        from app.api.v1.property import router
        print("✓ Property API router imported successfully")
        
        from app.workers.celery_app import celery
        print("✓ Celery app imported successfully")
        
        return True
    except Exception as e:
        print(f"✗ Import failed: {e}")
        return False

def test_config():
    """Test configuration loading"""
    try:
        from app.core.config import settings
        print(f"✓ Environment: {settings.APP_ENV}")
        print(f"✓ API Prefix: {settings.API_PREFIX}")
        return True
    except Exception as e:
        print(f"✗ Config test failed: {e}")
        return False

def main():
    print("Testing RLTR Backend Setup...")
    print("=" * 40)
    
    success = True
    
    if not test_imports():
        success = False
    
    if not test_config():
        success = False
    
    print("=" * 40)
    if success:
        print("✓ All tests passed! Backend is ready.")
        print("\nNext steps:")
        print("1. Copy env.example to .env and configure")
        print("2. Run: make install")
        print("3. Run: make compose")
        print("4. Run: make migrate")
        print("5. Run: make run")
    else:
        print("✗ Some tests failed. Check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
