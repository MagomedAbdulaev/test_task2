import json
import subprocess
import tempfile
import os

from django.http import JsonResponse
from django.shortcuts import render
from .serializers import *
from .models import *
from django.db.models import ObjectDoesNotExist


def tasks_list(request):

    tasks = Task.objects.all()

    return JsonResponse(serialize_tasks(tasks), safe=False)


def task_detail(request):

    task_id = request.GET.get('task_id')

    try:
        task = Task.objects.get(id=task_id)

        task_data = {
            "id": task.id,
            "name": task.name,
            "difficulty": task.difficulty,
            "description": task.description,
            "difficulty_class": 'easy' if task.difficulty == 'Легкий' else 'medium' if task.difficulty == 'Средний' else 'hard',
        }

        languages = [{'name': item.name, 'warp': item.warp, 'id': item.id} for item in Language.objects.all()]

        return JsonResponse({'status': 'ok', 'task': task_data, 'languages': languages})
    except ObjectDoesNotExist:
        return JsonResponse({'status': 'error', 'error_text': 'Такой задачи не найдено'})


def code_complete(request):

    code = request.GET.get('warpLanguage')  # Код пользователя
    language = request.GET.get('currentLanguage')  # Язык: 'python' или 'go'

    if not code:
        return JsonResponse({'status': 'error', 'error_text': 'Код не предоставлен'})

    try:
        # Указываем директорию проекта для создания файлов (например, в папке проекта)
        project_dir = os.path.dirname(os.path.abspath(__file__))  # Получаем путь к директории текущего файла
        code_dir = os.path.join(project_dir, "docker")  # Путь до директории для кода (папка 'docker' в проекте)

        # Создаем директорию, если она не существует
        os.makedirs(code_dir, exist_ok=True)

        if language == 'python':
            file_path = os.path.join(code_dir, "run.py")
            docker_image = "python:3.11-slim"
            run_command = f"docker run --rm -v {code_dir}:/usr/src/app {docker_image} python3 /usr/src/app/run.py"
        elif language == 'go':
            file_path = os.path.join(code_dir, "main.go")
            docker_image = "golang:1.21-alpine"
            run_command = f"docker run --rm -v {code_dir}:/usr/src/app {docker_image} go run /usr/src/app/main.go"
        elif language == 'javascript':
            file_path = os.path.join(code_dir, "app.js")
            docker_image = "node:20-slim"
            run_command = f"docker run --rm -v {code_dir}:/usr/src/app -w /usr/src/app {docker_image} node app.js"
        else:
            return JsonResponse({'status': 'error', 'error_text': 'Неподдерживаемый язык'})

        # Преобразуем путь для корректной работы на Windows
        file_path = file_path.replace("\\", "/")

        # Сохраняем код в файл
        with open(file_path, "w") as f:
            f.write(code)

        # Выполнение Docker-контейнера
        result = subprocess.run(run_command, shell=True, capture_output=True, text=True, timeout=10)

        # Проверка ошибок выполнения
        if result.returncode != 0:
            return JsonResponse({'status': 'error', 'error_text': result.stderr.strip()})

        return JsonResponse({'status': 'ok', 'result': result.stdout.strip()})

    except subprocess.TimeoutExpired:
        return JsonResponse({'status': 'error', 'error_text': 'Превышен лимит времени выполнения'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'error_text': str(e)})