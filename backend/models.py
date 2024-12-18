from django.db import models


class Task(models.Model):

    name = models.CharField(max_length=128, verbose_name='Название задачи')
    description = models.TextField(max_length=1024, verbose_name='Описание задачи')
    difficulty = models.CharField(max_length=40, choices={
        ("Легкий", "Легкий"),
        ("Средний", "Средний"),
        ("Сложный", "Сложный"),
    }, verbose_name="Уровень сложности задачи")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
        ordering = ['name']


class Language(models.Model):

    name = models.CharField(max_length=32, verbose_name='Название языка')
    warp = models.TextField(max_length=131072, verbose_name='Основа языка(Начало)')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Язык программирования'
        verbose_name_plural = 'Языки программирования'
        ordering = ['name']
