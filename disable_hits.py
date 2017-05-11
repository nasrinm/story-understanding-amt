import argparse

import simpleamt

if __name__ == '__main__':
  parser = argparse.ArgumentParser(parents=[simpleamt.get_parent_parser()],
              description="Delete HITs")
  parser.add_argument('--all', action='store_true', default=False)
  args = parser.parse_args()

  if (args.hit_ids_file is not None) == args.all:
    print 'Must specify exactly one of --hit_ids_file or --all'
    import sys; sys.exit(1)

  mtc = simpleamt.get_mturk_connection_from_args(args)

  if args.all:
    hit_ids = []
    for hit in mtc.get_all_hits():
      hit_ids.append(hit.HITId)
  else:
    with open(args.hit_ids_file, 'r') as f:
      hit_ids = [line.strip() for line in f]

  print ('This will delete %d HITs with sandbox=%s'
         % (len(hit_ids), str(args.sandbox)))
  print 'Continue?'
  s = raw_input('(Y/N): ')
  if s == 'Y' or s == 'y':
    for hit_id in hit_ids:
      mtc.disable_hit(hit_id)
      f = open(args.hit_ids_file,"r+")
      d = f.readlines()
      f.seek(0)
      for i in d:
        if i.strip('\n') not in hit_ids:
          f.write(i)
      f.truncate()
      f.close()


  else:
    print 'Aborting'

