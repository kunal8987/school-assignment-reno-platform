from django.db import models


class School(models.Model):
    name = models.TextField()
    address = models.TextField()
    city = models.TextField()
    state = models.TextField()
    contact = models.BigIntegerField()
    image = models.TextField()
    email_id = models.TextField()

    def __str__(self):
        return self.name
