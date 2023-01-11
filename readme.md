## The node.js snippets


This node.js snippet has included the auth, post, and comments crud operations.


## Requirements

* Node 12
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/webethics/code-snippet-node.git
cd code-snippet-node
```

```bash
npm install
```

To start the express server, run the following

```bash
npm run start
```

Open [http://localhost:5000](http://localhost:3000) and take a look around.


Open `environments/dev.env.ts` and inject your credentials so it looks like this

```
db_url=<db_url>
jwt_secret=<jwt_secret>
mail_driver=<mail_driver>
mail_host=<mail_host>
mail_port=<mail_port>
mail_username=<mail_username>
mail_password=<mail_password>
mail_from_email=<mail_from_email>
mail_from_name=<mail_from_name>
```

Step 7: To start the express server, run the following
```bash
npm run start
```
Final Step:

Open [http://localhost:5000](http://localhost:5000) and take a look around.

