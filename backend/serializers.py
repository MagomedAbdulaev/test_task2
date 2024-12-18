from .models import *
from typing import Iterable, List, Dict, Any


def serialize_tasks(tasks: Iterable[Task]) -> List[Dict[str, Any]]:
    data = []
    for task in tasks:
        data.append({
            "id": task.id,
            "name": task.name,
            "difficulty": task.difficulty,
            "difficulty_class": 'easy' if task.difficulty == 'Легкий' else 'medium' if task.difficulty == 'Средний' else 'hard',
        })
    return data
