Google Skills Pilot

## Inventory API on Google Cloud Run

This is a simple Python Flask application that serves as an inventory API. It is designed to be containerized with Docker and deployed to Google Cloud Run.

### Endpoints

- `/`: Returns a "Hello World" message along with the Cloud Run service and revision name.
- `/inventory`: Returns a list of inventory items from the `inventory.json` file.

### Prerequisites

- Google Cloud SDK (`gcloud`) installed and configured.
- Docker installed.
- An active Google Cloud project with the Cloud Run and Artifact Registry APIs enabled.

### Local Development and Testing

1.  **Build the Docker image:**

        ```sh
        docker build -t inventory-app .
        ```

    =8080 inventory-app
    ```

2.  **Run the Docker container locally:**

    ```sh
    docker run -p 8080:8080 -e PORT

    ```

3.  **Test the endpoints:**
    - Open your browser and go to `http://localhost:8080`
    - Open your browser and go to `http://localhost:8080/inventory`

### Deployment to Google Cloud Run

1.  **Set up environment variables** (replace `[PROJECT_ID]` with your Google Cloud project ID):

    ```sh
    export PROJECT_ID=[PROJECT_ID]
    export REGION=us-central1
    export REPO_NAME=inventory-repo
    export IMAGE_NAME=inventory-app
    ```

2.  **Create an Artifact Registry repository:**

    ```sh
    gcloud artifacts repositories create $REPO_NAME --repository-format=docker --location=$REGION
    ```

3.  **Build and push the image to Artifact Registry:**

    ```sh
    gcloud builds submit --tag $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME
    ```

4.  **Deploy the image to Cloud Run:**
    ```sh
    gcloud run deploy $IMAGE_NAME \
        --image=$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME \
        --region=$REGION \
        --allow-unauthenticated
    ```

After deployment, `gcloud` will provide a public URL to access your service.
