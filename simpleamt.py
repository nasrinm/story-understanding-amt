import argparse, json

import boto3
from boto.mturk.connection import MTurkConnection
from boto.mturk.qualification import *
from jinja2 import Environment, FileSystemLoader

"""
A bunch of free functions that we use in all scripts.
"""

def get_jinja_env(config):
  """
  Get a jinja2 Environment object that we can use to find templates.
  """
  return Environment(loader=FileSystemLoader(config['template_directories']))


def json_file(filename):
  with open(filename, 'r') as f:
    return json.load(f)


def get_parent_parser():
  """
  Get an argparse parser with arguments that are always needed
  """
  parser = argparse.ArgumentParser(add_help=False)
  parser.add_argument('--prod', action='store_false', dest='sandbox',
                      default=True,
                      help="Whether to run on the production AMT site.")
  parser.add_argument('--hit_ids_file')
  parser.add_argument('--config', default='config.json',
                      type=json_file)
  return parser


def get_mturk_connection_from_args(args):
  """
  Utility method to get an MTurkConnection from argparse args.
  """
  aws_access_key = args.config.get('aws_access_key')
  aws_secret_key = args.config.get('aws_secret_key')
  aws_access_key_sandbox = args.config.get('aws_access_key_sandbox')
  aws_secret_key_sandbox = args.config.get('aws_secret_key_sandbox')
  return get_mturk_connection(sandbox=args.sandbox,
                              aws_access_key=aws_access_key,
                              aws_secret_key=aws_secret_key,
                              aws_access_key_sandbox=aws_access_key_sandbox,
                              aws_secret_key_sandbox=aws_secret_key_sandbox )


def get_mturk_connection(sandbox=True, aws_access_key=None,
                         aws_secret_key=None,aws_access_key_sandbox=None,aws_secret_key_sandbox=None):
  """
  Get a boto mturk connection. This is a thin wrapper over the
  MTurkConnection constructor; the only difference is a boolean
  flag to indicate sandbox or not.
  """
  kwargs = {}
  if sandbox:
    if aws_access_key_sandbox is not None:
      kwargs['aws_access_key_id'] = aws_access_key_sandbox
    if aws_secret_key_sandbox is not None:
      kwargs['aws_secret_access_key'] = aws_secret_key_sandbox
    host = 'mechanicalturk.sandbox.amazonaws.com'
  else:
    if aws_access_key is not None:
      kwargs['aws_access_key_id'] = aws_access_key
    if aws_secret_key is not None:
      kwargs['aws_secret_access_key'] = aws_secret_key
    host='mechanicalturk.amazonaws.com'

  return MTurkConnection(host=host, **kwargs)


def setup_qualifications(hit_properties):
  """
  Replace some of the human-readable keys from the raw HIT properties
  JSON data structure with boto-specific objects.
  """
  
  qual = Qualifications()
  if 'country' in hit_properties:
    qual.add(LocaleRequirement('In', hit_properties['country']))
    del hit_properties['country']

  if 'hits_approved' in hit_properties:
    qual.add(NumberHitsApprovedRequirement('GreaterThan',
      hit_properties['hits_approved']))
    del hit_properties['hits_approved']

  if 'percent_approved' in hit_properties:
    qual.add(PercentAssignmentsApprovedRequirement('GreaterThan',
      hit_properties['percent_approved']))
    del hit_properties['percent_approved']
    
#  qual.add(Requirement(qualification_type_id="3TDQPWMDS877YXAXCWP6LHT0FJRANT",comparator='GreaterThan',integer_value=9))
# 3TDQPWMDS877YXAXCWP6LHT0FJRANT
  hit_properties['qualifications'] = qual
