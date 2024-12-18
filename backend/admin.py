from django.contrib import admin
from .models import *


class TaskAdmin(admin.ModelAdmin):

    list_display = ('name', 'difficulty', )
    list_display_links = ('name', 'difficulty', )
    list_filter = ('difficulty', )


class LanguageAdmin(admin.ModelAdmin):

    list_display = ('name', )
    list_display_links = ('name', )


admin.site.register(Task, TaskAdmin)
admin.site.register(Language, LanguageAdmin)
